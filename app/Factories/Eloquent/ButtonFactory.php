<?php

namespace App\Factories\Eloquent;

use App\Factories\Interfaces\ButtonFactoryInterface;
use App\Button;

class ButtonFactory implements ButtonFactoryInterface {
    
    public function add($data) 
    {
        Button::create([
            'url'              => $data['url'],
            'title'            => $data['title'],
            'background_color' => $data['background_color'],
            'text_color'       => $data['text_color'],
            'position'         => $data['position'],
            'user_id'          => $data['user_id'],
        ]);
    }

}
