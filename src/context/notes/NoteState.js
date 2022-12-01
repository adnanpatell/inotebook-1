import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const host ="http://localhost:5000"
const notesinitial =[]
      const [notes, setNotes] = useState(notesinitial)

      //Get All Notes
      const getNotes=async ()=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
        
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json= await response.json()
        setNotes(json)

      }


      //Add A Note
      const addNote=async (title,description,tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const note= await response.json()

        setNotes(notes.concat(note))
        
      }
      //Delete A NOte
      const deleteNote=async(id)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
        
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
        const json =  response.json();
        console.log(json)
   
        
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
        
      }

      //Edit A Note
      const editNote= async(id,title,description,tag)=>{
        //API CALL 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
        
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
             body: JSON.stringify({title,description,tag}) 
        });
        const json =await  response.json(); 
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        //LOGIC TO EDIT NOTE
        for(let index=0;index<notes.length;index++){
          const element =notes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes)
      }
    
    return(
        <NoteContext.Provider value={{notes ,addNote, deleteNote,editNote, setNotes,getNotes}}>
            {props.children}

        </NoteContext.Provider>
    ) 
}



export default NoteState;