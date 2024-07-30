import React, { useEffect, useRef, useState } from 'react'
import { getComments, postComments } from '../services/api';
import { convertTimeToHumanRelatable } from '../utils';
import Like from './Like';

export default function CommentSection(props) {
    const { slug, articleId } = props;
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [articleLikes, setArticleLikes] = useState([]);

    useEffect(() => {
        let user = JSON.parse(window.sessionStorage.getItem('user-details'));
        if (user) {
            setLoggedIn(true);
            setUserDetails(user.user);
        }
        const fetchComments = async () => {
            let article = await getComments(articleId);
            if (article.comments.length) {
                setComments(article.comments);
            }
            if (article?.likedBy_ids?.length) {
                setArticleLikes(article.likedBy_ids);
            }
        }
        fetchComments();
    }, [articleId]);


    const handleDelete = async (id) => {
        let filteredComments = comments.filter((comment) => comment._id !== id);
        setComments([...filteredComments]);
        let data = { articleId, slug, comments: filteredComments }
        await postComments(data);
    }

    const handleArticleLike = async (id) => {
        let updatedArticleLikeArray = [...articleLikes, userDetails._id];
        setArticleLikes(updatedArticleLikeArray);
        let data = { articleId, slug, likedBy_ids: updatedArticleLikeArray, comments: comments };
        await postComments(data);
    }
    const handleCommentLike = async (commentId) => {
        comments.forEach((comment) => {
            if (comment._id === commentId) {
                comment.likedBy_ids.push(userDetails._id);
            }
        })
        let updatedComments = [...comments];
        setComments(updatedComments);
        let data = { articleId, slug, likedBy_ids: articleLikes, comments: updatedComments };
        await postComments(data);
    }

    const handleArticleUnLike = async (id) => {
        let updatedArticleLikeArray = articleLikes.filter((userId) => userId !== userDetails._id);
        setArticleLikes([...updatedArticleLikeArray]);
        let data = { articleId, slug, likedBy_ids: updatedArticleLikeArray, comments: comments };
        await postComments(data);
    }

    const handleCommentUnLike = async (commentId) => {
        let comm = [...comments];
        comm.forEach((comment) => {
            if (comment._id === commentId) {
                comment.likedBy_ids = comment.likedBy_ids.filter((userId) => userId !== userDetails._id);
            }
        })
        let updatedComments = [...comm];
        setComments(updatedComments);
        let data = { articleId, slug, likedBy_ids: articleLikes, comments: updatedComments };
        await postComments(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);
        let body = formData.get('body');
        let newComments = [...comments, { body: body, userId: userDetails._id, likedBy_ids: [], createdAt: new Date(), updatedAt: new Date() }]
        let data = { articleId, slug, comments: newComments }
        await postComments(data);
        setComments([...comments, { body: body, userId: { "_id": userDetails._id, name: userDetails.name }, likedBy_ids: [], createdAt: new Date(), updatedAt: new Date() }]);
        event.target.reset();
    }

    return (
        <div className="flex mt-4 mb-4 flex-col justify-center">
            <div className="flex justify-evenly items-center mb-5">
                {loggedIn && <Like width={40} height={40} likesCount={articleLikes.length} likedCall={handleArticleLike} unLikedCall={handleArticleUnLike} referenceId={articleId} alreadyLiked={articleLikes.includes(userDetails._id)} key={"articleLike"} />}
                <h2 className="text-gray-800 text-lg mt-0 ">Comments ({comments.length})</h2>
            </div>
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
                            to view Comments and likes !!
                        </span>
                    </div>
                </a>
            }
            <div>
                {comments.length ?
                    comments.toReversed().map((comment, index) => (
                        <div key={index}>
                            <div className="flex flex-col mb-3 py-2 px-1">
                                <div className="flex justify-between">
                                    <div className="flex justify-start">
                                        <div className="px-2 capitalize font-medium tracking-wider text-lg">
                                            @{comment.userId.name}
                                        </div>
                                        <div className="ml-6">
                                            {/* {new Date(comment.createdAt).toLocaleTimeString()} | {new Date(comment.createdAt).toDateString()} */}
                                            {convertTimeToHumanRelatable(comment.createdAt)}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {loggedIn && comment.userId._id === userDetails._id ?
                                            <div className="flex">
                                                <div className='mx-2' onClick={() => handleDelete(comment._id)} id='deleteButton' title='Delete'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill='gray'>
                                                        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" ></path>
                                                    </svg>
                                                </div>
                                                <div className="mx-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                        <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            :
                                            <>
                                            </>
                                        }
                                        {loggedIn && <Like key={index + 'like'} width={20} height={20} likesCount={comment?.likedBy_ids?.length || 0} likedCall={handleCommentLike} unLikedCall={handleCommentUnLike} referenceId={comment._id} alreadyLiked={comment?.likedBy_ids?.includes(userDetails._id || false)} />}
                                    </div>
                                </div>
                                <div className="pl-7 text-lg">
                                    {comment.body}
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                    :
                    <div className="" key={'no-comment'}>
                        No Comments !
                    </div>
                }
            </div>
        </div>
    )
}
