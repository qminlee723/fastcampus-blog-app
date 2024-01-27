import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<PostProps>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name"> {post?.email}</div>
              <div className="post__date"> {post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              <div className="post__delete" onClick={handleDelete}>
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/1`}>수정</Link>
              </div>
            </div>
            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          "rㅔ시물이 없습ㄴ디ㅏ"
        )}
      </div>
    </>
  );
}
