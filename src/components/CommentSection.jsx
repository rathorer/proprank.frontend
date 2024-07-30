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
                {loggedIn ?
                    <Like width={40} height={40} likesCount={articleLikes.length} likedCall={handleArticleLike} unLikedCall={handleArticleUnLike} referenceId={articleId} alreadyLiked={articleLikes.includes(userDetails._id)} key={"articleLike"} />
                    :
                    <div className='flex items-center'>
                        <svg fill="none" width={40} height={40} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#040000" strokeWidth={1.9}><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804"></path></g></svg>
                        <span className='text-lg font-medium'>
                            ({articleLikes.length})
                        </span>
                    </div>
                }
                <h2 className="text-gray-800 text-lg mt-0 font-medium">Comments ({comments.length})</h2>
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
                    <> </>
                }
            </div>
        </div>
    )
}
