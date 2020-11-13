<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\ButtonRepositoryInterface;
use App\Factories\Interfaces\ButtonFactoryInterface;
use App\Button;
use \Illuminate\Validation\Rule;

class ButtonController extends Controller
{
    private $buttonRepository;
    private $buttonFactory;
    
    public function __construct
            (
                ButtonFactoryInterface $buttonFactoryInterface,
                ButtonRepositoryInterface $buttonRepositoryInterface
            ) 
    {
        $this->middleware('jwt.verify');
        $this->buttonFactory = $buttonFactoryInterface;
        $this->buttonRepository = $buttonRepositoryInterface;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $buttons = $this->buttonRepository->getAll();
        
        $filteredButtons = [];
        
        $emptyButton = [
            'id'               => '',
            'background_color' => Button::DEFAULT_BACKGROUND_COLOR,
            'border_color'     => Button::DEFAULT_BORDER_COLOR,
            'text_color'       => Button::DEFAULT_TEXT_COLOR,
            'title'            => Button::DEFAULT_TITLE,
            'url'              => '',
        ];
        
        for($i=1; $i<= Button::MAX_BUTTONS; $i++){
            
            $button = [];
            
            $buttonPosition = array_search($i, array_column($buttons, 'position'));
            
            if($buttonPosition !== false){
                $button = $buttons[$buttonPosition];
                
                $filteredButtons[] = [
                    'id'               => $button['id'],
                    'position'         => $button['position'],
                    'background_color' => $button['background_color'] ?? Button::DEFAULT_BACKGROUND_COLOR,
                    'border_color'     => $button['border_color'] ?? Button::DEFAULT_BORDER_COLOR,
                    'text_color'       => $button['text_color'] ?? Button::DEFAULT_TEXT_COLOR,
                    'title'            => $button['title'] ?? Button::DEFAULT_TITLE,
                    'url'              => $button['url'] ?? '',
                ];
            } else {
                $button = $emptyButton;
                $button['position'] = $i;
                $filteredButtons[] = $button;
            }
        }
        
        return response()->json($filteredButtons, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['url', 'title', 'background_color', 'text_color', 'position']);
        
        $rules = [
            'url'              => 'required|max:255|url|regex:/^[a-zA-Z0-9 _\/.?!,:-]*$/',
            'title'            => 'required|max:255|regex:/^[a-zA-Z0-9 _.?!,:-]*$/',
            'background_color' => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'text_color'       => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'position'         => Rule::unique('buttons')->where(function ($query) use ($requestData) {
                                    return $query->where('user_id', auth()->id())
                                       ->where('position', $requestData['position']);
                                 })
        ];
        
        $requestData['user_id'] = auth()->id();
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->buttonFactory->add($requestData);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
        
        return response()->json(['success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($position)
    {
        try{
            $button = $this->buttonRepository->get($position);
        }
        catch(\Exception $e){
            return response()->json(['error' => [$e->getMessage()]], 500);
        }
        
        return response()->json($button, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->only(['url', 'title', 'background_color', 'text_color', 'position']);
        
        $rules = [
            'url'              => 'required|max:255|url|regex:/^[a-zA-Z0-9 _\/.?!,:-]*$/',
            'title'            => 'required|max:255|regex:/^[a-zA-Z0-9 _.?!,:-]*$/',
            'background_color' => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
            'text_color'       => 'nullable|max:255|regex:/^[a-zA-Z0-9 _.?#!,:-]*$/',
        ];
        
        $requestData['user_id'] = auth()->id();
        
        $validator = \Validator::make($requestData, $rules);
        
        if($validator->fails()){
            return response()->json($validator->messages(), 400);
        }
        
        try{
            $this->buttonRepository->update($id, $requestData);
        }
        catch(\Exception $e){
            return response()->json(['error' => ['Server Error']], 500);
        }
        
        return response()->json(['success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($position)
    {
        try{
            $this->buttonRepository->delete($position);
            return response()->json(['success'], 200);
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
