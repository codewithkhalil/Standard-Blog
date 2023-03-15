import React from 'react'

const EditProfile = ({closeModal}) => {

  return (
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl p-10">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className='py-3 px-2'>
                            <h1 className='text-2xl font-bold'>Profile Information</h1>
                            <div className='w-80'>
                                <div className='pb-5'>
                                    <label htmlFor="name" className='text-sm'>Username</label>
                                    <input id='name' value='John Doe' className='w-full bg-gray-100 rounded-sm p-2  focus:outline-black' readOnly/>
                                </div>
                                <div>
                                    <label htmlFor="name" className='text-sm'>Email</label>
                                    <input id="email" value='john@email.com' className='w-full bg-gray-100 rounded-sm p-2  focus:outline-black' readOnly/>
                                </div>           
                            </div>
                        </div>
                        <div className="flex items-center justify-center" >            
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => closeModal()}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                // onClick={() => setShowModal(false)}
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
  );
}

export default EditProfile