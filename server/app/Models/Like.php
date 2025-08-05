<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Like extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the like.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent likeable model (post or comment).
     */
    public function likeable()
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to only include likes for a specific model.
     */
    public function scopeForModel($query, Model $model)
    {
        return $query->where('likeable_type', get_class($model))
                    ->where('likeable_id', $model->id);
    }

    /**
     * Check if a user has liked a specific model.
     */
    public static function hasLiked(Model $user, Model $model): bool
    {
        return static::query()
            ->where('user_id', $user->id)
            ->forModel($model)
            ->exists();
    }

    /**
     * Toggle like for a model by a user.
     */
    public static function toggle(Model $user, Model $model): void
    {
        $like = static::query()
            ->where('user_id', $user->id)
            ->forModel($model)
            ->first();

        if ($like) {
            $like->delete();
            return;
        }

        $model->likes()->create([
            'user_id' => $user->id,
        ]);
    }
}
