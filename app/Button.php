<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Button extends Model
{
    const MAX_BUTTONS = 9;
    const DEFAULT_BACKGROUND_COLOR = '#ccd1d9';
    const DEFAULT_BORDER_COLOR = '#7e8387';
    const DEFAULT_TEXT_COLOR = '#FFFFFF';
    const DEFAULT_TITLE = '...';
    
    protected $fillable = [
        'user_id', 'position', 'background_color',
        'text_color', 'border_color', 'title', 'url'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
