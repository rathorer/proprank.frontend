import React, { useEffect, useRef, useState } from 'react'
import { getComments, postComments } from '../services/api';
import { convertTimeToHumanRelatable } from '../utils';
import Like from './Like';
import Popup from './Popup';

export default function CommentSection(props) {
    const { slug, articleId, currentUrl, title } = props;
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [articleLikes, setArticleLikes] = useState([]);
    const [deleteDropdown, setDeleteDropdown] = useState({});

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
        if (!loggedIn) {
            window.location.href = "/login";
        } else {
            let updatedArticleLikeArray = [...articleLikes, userDetails._id];
            setArticleLikes(updatedArticleLikeArray);
            let data = { articleId, slug, likedBy_ids: updatedArticleLikeArray, comments: comments };
            await postComments(data);
        }
    }
    const handleCommentLike = async (commentId) => {
        if (!loggedIn) {
            window.location.href = "/login"
        } else {
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
    }

    const handleArticleUnLike = async (id) => {
        if (loggedIn) {
            let updatedArticleLikeArray = articleLikes.filter((userId) => userId !== userDetails._id);
            setArticleLikes([...updatedArticleLikeArray]);
            let data = { articleId, slug, likedBy_ids: updatedArticleLikeArray, comments: comments };
            await postComments(data);
        }
    }

    const handleCommentUnLike = async (commentId) => {
        if (loggedIn) {
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
    }

    const handleSubmit = async (event) => {
        if (!loggedIn) {
            window.location.href = "/login";
        } else {
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
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    }

    const handleDeleteClick = (id) => {
        setDeleteDropdown({ ...deleteDropdown, [id]: !deleteDropdown[id] });
    }

    const handleClickOutside = () => {
        setDeleteDropdown({});
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex mt-4 mb-4 flex-col justify-center">
            <div className="flex items-center mb-5 justify-between">
                <div className="flex gap-4">
                    <Like classes={"w-8 h-8 sm:w-10 sm:h-10"} likesCount={articleLikes.length} likedCall={handleArticleLike} unLikedCall={handleArticleUnLike} referenceId={articleId} alreadyLiked={articleLikes.includes(userDetails._id)} key={"articleLike"} />
                    <div className="flex items-center">
                        <svg className='w-8 h-8 sm:w-9 sm:h-9' viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.7871 35.1719C23.7538 35.1719 26.6539 34.2921 29.1207 32.6439C31.5874 30.9957 33.51 28.653 34.6453 25.9121C35.7806 23.1712 36.0777 20.1552 35.4989 17.2455C34.9201 14.3358 33.4915 11.6631 31.3937 9.56528C29.2959 7.46749 26.6232 6.03888 23.7135 5.4601C20.8037 4.88132 17.7877 5.17837 15.0469 6.31369C12.306 7.449 9.96329 9.37159 8.31507 11.8383C6.66684 14.3051 5.78711 17.2052 5.78711 20.1719C5.78711 22.6519 6.38711 24.9885 7.45378 27.0502L5.78711 35.1719L13.9088 33.5052C15.9688 34.5702 18.3088 35.1719 20.7871 35.1719Z" stroke="#363636" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-center text-lg 2xl:text-2xl">
                            {comments.length}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-7 h-7" title='Copy link'>
                        <Popup popupContent={"Copied!"} client:load>
                            <div onClick={handleCopy}>
                                <img
                                    src="/link-black.png"
                                    alt="link-icon"
                                    className="w-auto h-auto"
                                    id="linkimgtag"
                                />
                            </div>
                        </Popup>
                    </div>
                    <div className="w-7 h-7">
                        <a
                            className="twitter-share-button"
                            href={`https://twitter.com/intent/tweet?url=${title + "-"} ${currentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="twitter"
                            id="twitter-icon"
                        >
                            <img
                                src="/twitter-icon.png"
                                alt="twitter-icon"
                                className="w-auto h-auto"
                            />
                        </a>
                    </div>
                    <div className="w-7 h-7">
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            id="LinkedIn-icon"
                        >
                            <img
                                src="/linkedin-icon.png"
                                alt="linkedin-icon"
                                className="w-auto h-auto"
                            />
                        </a>
                    </div>
                    <div className="w-8 h-8">
                        <a
                            href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="whatsapp"
                            id="whatsapp-icon"
                        >
                            <img
                                src="/whatsapp-icon.png"
                                alt="whatsapp-icon"
                                className="w-auto h-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <hr />

            <form className="my-10" method='POST' onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="mb-2 w-full">
                        <textarea className="w-full rounded-2xl border border-black/25 leading-normal py-4 pl-6 pr-24 font-medium placeholder-gray-600 focus:outline-none text-slate-700 placeholder-black/70 drop-shadow-[0px_30px_25px_rgba(0,0,0,0.04)]" name="body" placeholder='Write your thoughts' required
                            title='Write your comment' rows={1}>
                        </textarea>
                    </div>
                    <button type='submit' className="absolute bg-[#07B54F] rounded-xl text-white font-semibold py-1 px-6 border border-gray-400 tracking-wide right-3 top-3" >
                        Post
                    </button>
                </div>
            </form>

            <div className="shadow-2xl rounded-lg h-auto mt-6 pb-6">
                <div className="flex justify-between px-5 py-5">
                    <div className="text-light-grey text-xl font-semibold">
                        Comments ({comments.length})
                    </div>
                    {/* {comments.length > 0 && <button className="text-[#07B54F] underline underline-offset-4">
                        Show All
                    </button>} */}
                </div>
                {comments.length ?
                    comments.toReversed().map((comment, index) => (
                        <div key={index} className='px-6 sm:px-8 flex flex-col gap-5 my-4 h-full'>
                            {index !== 0 && <div className="h-[1px] bg-gradient-to-r from-[#252D47]/20 via-[#252D47]/50 to-[#252D47]/20"></div>}
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <div className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="profile" width={40} height={40}><path d="M11.78,11.28A4.462,4.462,0,0,1,16,6.61a4.462,4.462,0,0,1,4.22,4.67A4.45912,4.45912,0,0,1,16,15.94,4.45912,4.45912,0,0,1,11.78,11.28ZM30.04,16a13.91894,13.91894,0,0,1-2.39,7.82,1.43134,1.43134,0,0,1-.14.2,14.01332,14.01332,0,0,1-23.02,0,1.43134,1.43134,0,0,1-.14-.2A14.03633,14.03633,0,1,1,30.04,16ZM3.46,16a12.51091,12.51091,0,0,0,1.57,6.09C7.2,19.24,11.36,17.46,16,17.46s8.8,1.78,10.97,4.63A12.543,12.543,0,1,0,3.46,16Z"></path></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="capitalize font-medium tracking-wider text-lg">
                                            {comment?.userId?.name}
                                        </div>
                                        <div className="text-gray text-sm">
                                            {convertTimeToHumanRelatable(comment.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                {loggedIn && comment?.userId?._id === userDetails?._id &&
                                    <div className="">
                                        <div className="cursor-pointer bg-[#e6eff6] rounded-lg px-1 sm:px-2" id='delete-icon' onClick={() => handleDeleteClick(comment._id)}>
                                            <svg width="28" height="28" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.4856 20.8115H20.5144M9 20.8115H9.02871M31.9713 20.8115H32" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>
                                        {deleteDropdown[comment._id] && <div className="absolute bg-[#e6eff6] w-36 text-black rounded-lg mt-1 -ml-[108px] font-medium drop-shadow z-10" onClick={() => handleDelete(comment._id)}>
                                            <div className="text-center py-2">
                                                Delete
                                            </div>
                                        </div>}
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <div className="text-[#687383] text-[20px]">
                                    {comment.body}
                                </div>
                                <div className="bg-[#e6eff6] rounded-lg px-2">
                                <Like key={index + 'like'} classes={"w-6 h-6"} likesCount={comment?.likedBy_ids?.length || 0} likedCall={handleCommentLike} unLikedCall={handleCommentUnLike} referenceId={comment._id} alreadyLiked={comment?.likedBy_ids?.includes(userDetails._id || false)} />
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className="p-20" key={'no-comment'}>
                        No Comments !
                    </div>
                }
            </div>
        </div>
    )
}
