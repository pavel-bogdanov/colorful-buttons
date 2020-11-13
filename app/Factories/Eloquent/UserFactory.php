<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Factories\Eloquent;

use App\Factories\Interfaces\UserFactoryInterface;
use Illuminate\Support\Facades\Hash;
use App\User;

/**
 * Description of UserRepository
 *
 * @author Pavel
 */
class UserFactory implements UserFactoryInterface 
{
    
    public function create($data) 
    {
        User::create([
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
            'fname'    => $data['fname'],
            'lname'    => $data['lname'],
        ]);
    }

}
