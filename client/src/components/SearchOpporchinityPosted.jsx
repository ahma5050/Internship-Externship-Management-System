import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeadCell,
  Button,
  Badge,
  Avatar,
  Spinner,
  Modal,
} from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
  HiOutlineRefresh,
  HiOutlineEye,
  HiOutlineUsers,
} from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { ThemContext } from "../context/ThemContext";

const SearchOpportunityPosted = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkModehandle, darkMode } = useContext(ThemContext);
  console.log("selectedPost", selectedPost);  

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = `/api/postRoute/getPost?startIndex=0`;
      if (currentUser?.roles === "Faculty") {
        query += `&userId=${currentUser._id}`;
      }
      const res = await fetch(query);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setUserPosts(data.posts);
      setShowMore(data.posts.length === 5);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      let query = `/api/postRoute/getPost?startIndex=${startIndex}`;
      if (currentUser?.roles === "Faculty") {
        query += `&userId=${currentUser._id}`;
      }
      const res = await fetch(query);
      if (!res.ok) throw new Error("Failed to fetch more posts");
      const data = await res.json();
      setUserPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 5);
    } catch (error) {
      console.error("Error fetching more posts:", error.message);
    }
  };

  const handleViewClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Spinner size="xl" color="purple" />
          <p
            className={`mt-4 text-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Loading your opportunities...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2 font-serif">
              Your Posted Opportunities
            </h1>
            <p className="text-gray-400 text-xl">
              {userPosts.length > 0
                ? `You have ${userPosts.length} opportunities`
                : "No posts yet"}
            </p>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Button
              color={darkMode ? "gray" : "light"}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <HiOutlineRefresh
                className={`mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <Table hoverable className="min-w-full">
              <TableHead>
                {[
                  "Opportunity",
                  "Details",
                  "Category",
                  "Status",
                  "Updated",
                  "Actions",
                ].map((head) => (
                  <TableHeadCell key={head}>{head}</TableHeadCell>
                ))}
              </TableHead>
              <TableBody className="divide-y">
                {userPosts.map((post) => (
                  <TableRow
                    key={post._id}
                    className={
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }
                  >
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Avatar
                          img={`http://localhost:3000${post.image}`}
                          alt={post.title}
                          className="w-12"
                        />
                        <div>
                          <span className="font-bold">{post.title}</span>
                          <div className="text-sm text-gray-500 flex items-center font-serif">
                            <HiOutlineOfficeBuilding className="mr-1" size={20} />{" "}
                            {post.companyName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center font-serif">
                          <HiOutlineClock className="mr-1" size={20} /> {post.duration}
                        </div>
                        <div className="flex items-center">
                          <HiOutlineLocationMarker className="mr-1" size={20} />{" "}
                          {post.location}
                        </div>
                        <Badge className="p-1"
                          color={post.type === "Full-time" ? "success" : "indigo"}
                        >
                          {post.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge color="purple" className="mt-8">
                        <HiOutlineTag className="mr-1" size={20} />
                        <span className="font-serif">{post.category}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge color="green" className="mt-10 font-serif">Active</Badge>
                    </TableCell>
                    <TableCell className="pt-14">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="pt-14 font-serif">
                      <div className="flex gap-2">
                        <Button
                          size="xs"
                          onClick={() => handleViewClick(post)}
                          color="gray"
                        >
                          <HiOutlineEye className="mr-1" size={20} /> View
                        </Button>
                    
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {showMore && (
            <div className="text-center p-4 border-t">
              <Button
                onClick={handleShowMore}
                color={darkMode ? "gray" : "light"}
              >
                Load More <FiExternalLink className="ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal show={isModalOpen} onClose={closeModal} size="lg">
          <Modal.Header>Opportunity Details</Modal.Header>
          <Modal.Body>
            {selectedPost && (
              <div className="space-y-5 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  {selectedPost.title}
                  <svg className="w-5 h-5 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </h2>

                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Company:</span> {selectedPost.companyName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Duration:</span> {selectedPost.duration}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Location:</span> {selectedPost.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Type:</span> {selectedPost.type}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Category:</span> {selectedPost.category}
                </p>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-1">Description:</p>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {selectedPost.description}
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                <Link to={`/ApplayInter?facultyId=${selectedPost.facultyId}&postId=${selectedPost._id}`}>
  <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold shadow-md hover:scale-105 transition-transform">
    Apply Now
  </button>
</Link>

                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SearchOpportunityPosted;
