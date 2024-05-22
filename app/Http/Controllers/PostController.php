<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user')->get(); // Eager load the user
        return response()->json([
            'posts' => $posts,
            'message' => 'Posts fetched successfully',
            'code' => 200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => 'Invalid body or title. Try again.',
                'code' => 422
            ], 422);
        }

        try {
            $post = new Post();
            $post->title = $request->input('title');
            $post->body = $request->input('body');
            $post->user_id = Auth::id(); // Set the user_id to the authenticated user's ID

            $post->save();

            return response()->json([
                'post' => $post,
                'message' => 'Post created successfully.',
                'code' => 201
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Post creation failed.',
                'error' => $e->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with('user')->find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found.',
                'code' => 404
            ], 404);
        }

        return response()->json([
            'post' => $post,
            'message' => 'Post fetched successfully.',
            'code' => 200
        ], 200);
    }

    /**
     * Display user-specific posts.
     */
    public function getUserPosts()
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

        // Fetch posts belonging to the authenticated user
        $userPosts = Post::where('user_id', $userId)->with('user')->get();

        return response()->json([
            'posts' => $userPosts,
            'message' => 'User-specific posts fetched successfully',
            'code' => 200
        ], 200);
    }

    public function delete($id)
    {
        if ($post = Post::find($id)) {
            $post->delete();

            return response()->json(['message' => 'Post deleted successfully'], 200);
        }

        return response()->json(['message' => 'Post not found'], 404);
    }

    public function edit(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->update($request->only('title', 'body'));

        return response()->json($post);
    }
}
