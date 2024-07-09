import React, { useEffect, useState } from 'react'
import { getComments, postComments } from '../services/api';

export default function CommentSection(props) {
    const { slug, articleId } = props;
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        let user = JSON.parse(window.sessionStorage.getItem('user-details'));
        if (user) {
            setLoggedIn(true);
            setUserDetails(user.user);
        }
        const fetchComments = async () => {
            let existingComments = await getComments(articleId);
            if (existingComments.comments.length) {
                setComments(existingComments.comments);
            }
        }
        fetchComments();
    }, [articleId]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);
        let body = formData.get('body');
        let newComments = [...comments, { body: body, userId: userDetails._id, createdAt: new Date(), updatedAt: new Date() }]
        let data = { articleId, slug, comments: newComments }
        await postComments(data);
        setComments([...comments, { body: body, userId: { "_id": userDetails._id, name: userDetails.name }, createdAt: new Date(), updatedAt: new Date() }]);
        event.target.reset();
    }

    return (
        <div className="flex mt-4 mb-4 flex-col justify-center">
            <h2 className="px-2 text-gray-800 text-lg mt-0">Comments ({comments.length})</h2>
            {loggedIn ?
                <form className="rounded-lg mb-4" method='POST' onSubmit={handleSubmit}>
                    <div className="flex  mt-2 flex-col">
                        <div className="flex justify-between">
                            <div className="px-1 mb-2 w-full sm:px-2">
                                <textarea className="w-full bg-gray-100 rounded border border-gray-400 leading-normal  py-2 px-3 font-medium placeholder-gray-600 focus:outline-none focus:bg-white text-slate-700 focus:placeholder-slate-400" name="body" placeholder='Type Your Comment' required
                                    title='Write your comment' rows={5}>
                                </textarea>
                            </div>
                            <div className="ml-2">
                                <input type='submit' className="bg-blue-600 text-white font-medium py-1 px-1 border border-gray-400 rounded-md tracking-wide hover:bg-blue-500 sm:px-2" value='Comment' />
                            </div>
                        </div>
                    </div>
                </form> :
                <a href="/login">
                    <div className='bg-zinc-200 text-center text-xl text-slate-800 p-3 mb-5'>
                        <span className='hover:underline hover:text-slate-600'>
                            Login
                        </span>

                        <span className='ml-1'>
                            to Comment!
                        </span>
                    </div>
                </a>
            }
            <div>
                {comments.length ?
                    comments.toReversed().map((comment, index) => (
                        <>
                            <div className=" flex flex-col mb-3 py-2 px-1" key={index}>
                                <div className="flex justify-between">
                                    <div className="px-2 capitalize font-medium tracking-wider text-lg">
                                        @{comment.userId.name}
                                    </div>
                                    <div className="">
                                        {new Date(comment.createdAt).toLocaleTimeString()} | {new Date(comment.createdAt).toDateString()}
                                    </div>
                                </div>
                                <div className="pl-7 text-lg">
                                    {comment.body}
                                </div>
                            </div>
                            <hr />
                        </>
                    ))
                    :
                    <div className="">
                        No Comments !
                    </div>
                }
            </div>
        </div>
    )
}
