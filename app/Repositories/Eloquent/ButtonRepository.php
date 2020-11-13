<?php

namespace App\Repositories\Eloquent;
use App\Repositories\Interfaces\ButtonRepositoryInterface;
use App\Button;
use App\User;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ButtonRepository
 *
 * @author Pavel
 */
class ButtonRepository implements ButtonRepositoryInterface{
    
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

    public function delete($position) 
    {
        $button = Button::where('position', $position)
                ->where('user_id', auth()->id());
        
        $button->delete();
    }

    public function get($position) 
    {
        return Button::where('position', $position)
                ->where('user_id', auth()->id())->get()->toArray();
    }

    public function getAll(): array
    {
        return Button::where('user_id', auth()->id())->get()->toArray();
    }

    public function update($id, $data) {
        $appointment = Button::findOrFail($id);
        
        $appointment->url = $data['url'];
        $appointment->title = $data['title'];
        $appointment->background_color = $data['background_color'];
        $appointment->text_color = $data['text_color'];
        
        $appointment->save();
    }

}
