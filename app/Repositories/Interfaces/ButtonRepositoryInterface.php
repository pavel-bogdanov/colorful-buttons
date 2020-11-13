<?php

namespace App\Repositories\Interfaces;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Pavel
 */
interface ButtonRepositoryInterface 
{
    public function getAll(): array;
    public function get($id);
    public function add($data);
    public function update($id, $data);
    public function delete($id);
}
