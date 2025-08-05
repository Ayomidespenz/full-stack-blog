<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'relationships' => [
                'posts_count' => $this->whenCounted('posts'),
                'posts' => $this->whenLoaded('posts', function () {
                    return $this->posts->map(function ($post) {
                        return [
                            'id' => $post->id,
                            'title' => $post->title,
                            'slug' => $post->slug,
                            'excerpt' => $post->excerpt_text,
                            'featured_image' => $post->featured_image ? asset('storage/' . $post->featured_image) : null,
                            'published_at' => $post->published_at?->toDateTimeString(),
                        ];
                    });
                }),
            ],
            'links' => [
                'self' => route('api.tags.show', $this->slug),
                'web' => route('tags.show', $this->slug),
            ],
        ];
    }
}
