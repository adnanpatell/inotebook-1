import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const { notes, getNotes ,editNote} = context;
  const handleclick=(e)=>{
    console.log("Updatingf the Note.........",note)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    props.showAlert("Updated Successfully", "success")
}
const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history('/login')
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  };
  const ref= useRef(null);
  const refclose= useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      
      >
     
            </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" value={note.etitle} onChange={onchange}  minLength={5} required/>
                    <div id="emailHelp" class ="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}/>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Note</h1>
        <div className="container">
        {notes.length===0 && 'No Notes To Display!'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          ); 
        })}
      </div>
    </>
  );
};

export default Notes;
