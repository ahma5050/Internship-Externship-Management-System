import {
      Table,
      TableBody,
      TableRow,
      TableCell,
      TableHead,
      TableHeadCell,
      Button,
      Modal,
    } from "flowbite-react";
    import React, { useEffect, useState } from "react";
    import { HiOutlineExclamationCircle } from "react-icons/hi";
    import { useSelector } from "react-redux";
    import { Link } from "react-router-dom";
    import UpdatePosts from "./UpdatePosts";
    import { RiDeleteBin6Line } from "react-icons/ri";
    import { MdEditSquare } from "react-icons/md";
    
    const DashPosts = () => {
        const { currentUser } = useSelector(
          (state) => state.user
        );
      const [userPosts, setUserPosts] = useState([]);
      const [showMore, setShowMore] = useState(true);
      const [showModel, setShowModel] = useState(false);
      const [postIdToDelete, setpostIdToDelete] = useState("");
      console.log("postIdToDelete", postIdToDelete);
      console.log();
    
      useEffect(() => {
            const fetchPosts = async () => {
              try {
                const res = await fetch(`/api/postRoute/getPost?facultyId=${currentUser._id}&startIndex=0`);
                const data = await res.json();
                console.log("Fetched Posts:", data);
          
                if (res.ok) {
                  setUserPosts(data.posts);
                  // Only hide "Show More" if fewer than 5 returned
                  setShowMore(data.posts.length === 5);
                }
              } catch (error) {
                console.error("Error fetching posts:", error.message);
              }
            };
          
            if (currentUser?.roles === "Faculty") {
              fetchPosts();
            }
          }, [currentUser?._id]);
          
    
          const handleShowMore = async () => {
            const startIndex = userPosts.length;
            try {
              const res = await fetch(
                `/api/postRoute/getPost?userId=${currentUser._id}&startIndex=${startIndex}`
              );
              const data = await res.json();
              if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                setShowMore(data.posts.length === 5);
              }
            } catch (error) {
              console.error("Error fetching more posts:", error.message);
            }
          };
          
    
      const handleDeleteUser = async () => {
        try {
          const res = await fetch(
            `/api/postRoute/deletePost/${postIdToDelete}/${currentUser._id}`,
            {
              method: "DELETE",
            }
          );
          setShowModel(false);
    
          const data = await res.json();
    
          if (!res.ok) {
            console.log(data.message);
          } else {
            setUserPosts((prev) =>
              prev.filter((post) => post._id !== postIdToDelete)
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      return (
        <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
          {currentUser?.roles==="Faculty" && userPosts.length > 0 ? (
            <>
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>Date Updated</TableHeadCell>
                  <TableHeadCell>Post Image</TableHeadCell>
                  <TableHeadCell>Post Title</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>CompanyName</TableHeadCell>
                  <TableHeadCell>Duration</TableHeadCell>
                  <TableHeadCell>Type</TableHeadCell>
                  <TableHeadCell>Location</TableHeadCell>
                  <TableHeadCell>Delete</TableHeadCell>
                  <TableHeadCell>
                    <span>Edit</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {userPosts.map((post) => (
                    <TableRow
                      key={post._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={`http://localhost:3000${post.image}`}
                            alt="post image"
                            className="w-20 h-14 object-cover rounded-md border border-gray-300"
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/post/${post.slug}`}
                          className="font-medium text-gray-900 dark:text-white"
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Link to={`/post/${post.companyName}`}
                          
                        >
                          {post.companyName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/post/${post.duration}`}
                          
                        >
                          {post.duration}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/post/${post.type}`}
                          
                        >
                          {post.type}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/post/${post.location}`}
                          
                        >
                          {post.location}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <span
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                          onClick={() => {
                            setShowModel(true);
                            setpostIdToDelete(post._id);
                          }}
                        >
                         <RiDeleteBin6Line size={25}/>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link to={`/UpdatePosts/${post._id}`}>
                          <span className="text-teal-500 hover:underline cursor-pointer">
                          <MdEditSquare size={25}/>
                          </span>
                        </Link>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center text-sm py-7"
                >
                  Show More
                </button>
              )}
            </>
          ) : ( 
            <p className="text-xl font-serif text-center">You have not created any posts yet.....</p>
          )}
    
          <Modal
            show={showModel}
            onClose={() => setShowModel(false)}
            popup
            size="md"
          >
            <Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h1 className="text-md mb-5 text-gray-500 dark:text-gray-200">
                    Are you sure do you wana delete this post ?
                  </h1>
                  <div className="flex justify-center gap-5">
                    <Button
                      className="flex justify-center gap-4"
                      color="failure"
                      onClick={handleDeleteUser}
                    >
                      yes, I am sure
                    </Button>
                    <Button
                      className="border border-gray-600"
                      color="gray"
                      onClick={() => setShowModel(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal.Header>
          </Modal>
        </div>
      );
    };
    
    export default DashPosts;
    