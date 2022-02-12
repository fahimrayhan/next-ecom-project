
function Toast({msg,handleShow,bgColor}) {
  return (
      <div className={`toast show align-items-center ${bgColor}`} role="alert" aria-live="assertive" aria-atomic="true" 
        style={{top:'5px', right:'5px', zIndex: 9, minWidth:'240px'}}>
          <div className="d-flex">
              <div className="toast-body">
                  {msg.msg}
              </div>
              <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={handleShow}></button>
          </div>
      </div>
  )
}

export default Toast