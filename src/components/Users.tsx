import React, { useState, useEffect } from 'react';
import '../App.css';
import { userData } from 'features/userData/userInfoSlice';
import { useAppDispatch } from 'app/hook';
import { OK } from 'config/httpStatusCodes';
import { AppDispatch } from 'app/store';
import { changeTheStatusData } from 'features/userData/changeTheStatuSlice';
import { showError } from 'helpers/messageHelper';
import { updateUserData } from 'features/userData/updateUserDataSlice';
import { deleteUserData } from 'features/userData/deleteUserSlice';


const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  
  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const userAction = userData({ page: page, limit: itemsPerPage });
      const { payload } = await (dispatch as AppDispatch)(userAction);

      if(payload && payload.status === OK && payload.data.responseData){
        setUsers(payload.data.responseData.users)
        setTotalPages(Math.ceil(payload.data.responseData.total_count / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async () => {
    const userUpdateAction = updateUserData({ userId: selectedUser._id, people_count: selectedUser.people_count, total_earnings: selectedUser.total_earnings, username: selectedUser.username, password: selectedUser.password });
    const {payload}: any = await (dispatch as AppDispatch)(userUpdateAction);
    if(payload && payload.status === OK){
      await fetchUsers(currentPage);
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleChangeStatus = async (userId: string) => {
    try {
      const userStatusChangeAction = changeTheStatusData({ userId: userId });
      const {payload}: any = await (dispatch as AppDispatch)(userStatusChangeAction);
      if(payload && payload.status === OK){
      await fetchUsers(currentPage);
      }else {
        showError(payload.data.message)
      }
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        const userDeleteAction = deleteUserData({ userId: userToDelete });
        const { payload }: any = await (dispatch as AppDispatch)(userDeleteAction);
        if (payload && payload.status === OK) {
          await fetchUsers(currentPage);
        } else {
          showError(payload.data.message);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setIsConfirmDeleteOpen(false);
        setUserToDelete(null);
      }
    }
  };

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const openConfirmDelete = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDeleteOpen(true);
  };

  console.log("usersusersusers",users)

  const modalStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  };

  const modalContentStyles: React.CSSProperties = {
    position: 'relative',
    maxWidth: '80%',
    maxHeight: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Referal By</th>
                <th>Referal Users Count</th>
                <th>Total Earning</th>
                <th>Approval Status</th>
                <th>Area</th>
                <th>Payment Photo</th>
                <th>Collage</th>
                <th>Age</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.referral_by ?? '-'}</td>
                  <td>{user.people_count}</td>
                  <td>{user.total_earnings}</td>
                  <td style={{ color: user.approved_by_admin ? 'green' : 'red' }}>
                    {user.approved_by_admin ? "Approved" : "Pending"}
                  </td>
                 
                  <td>{user.area}</td>
                  <td>
                    <img 
                      src={user.payment_qr_code} 
                      alt="Payment QR Code" 
                      style={{ width: '100px', height: '100px', cursor: 'pointer' }} 
                      onClick={() => handlePhotoClick(user.payment_qr_code)} 
                    />
                  </td>
                  <td>{user.collage_name}</td>
                  <td>{user.age}</td>
                  <td>
                    <button onClick={() => handleChangeStatus(user._id)}>Click to change</button>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>✏️</button>
                  </td>
                  <td>
                    <button onClick={() => openConfirmDelete(user._id)}>Delete User</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Update Details</h2>
                <label>
                  <span>Referal Users Count</span>
                  <input 
                    type="text" 
                    value={selectedUser?.people_count} 
                    onChange={(e) => setSelectedUser({ ...selectedUser, people_count: e.target.value })} 
                    placeholder="Please enter username!" 
                    required 
                  />
                </label>
                <label>
                  <span>Total Earning</span>
                  <input 
                    type="text" 
                    value={selectedUser?.total_earnings} 
                    onChange={(e) => setSelectedUser({ ...selectedUser, total_earnings: e.target.value })} 
                    placeholder="Please enter password!" 
                    required 
                  />
                </label>
                <label>
                  <span>Username</span>
                  <input 
                    type="text" 
                    value={selectedUser?.username} 
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} 
                    placeholder="Please enter username!" 
                    required 
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input 
                    type="text" 
                    value={selectedUser?.password} 
                    onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })} 
                    placeholder="Please enter password!" 
                    required 
                  />
                </label>
                <div className="modal-buttons">
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button onClick={handleUpdateUser}>Update</button>
                </div>
              </div>
            </div>
          )}

          <div className="pagination">
            <button className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-text">Page {currentPage} of {totalPages}</span>
            <button className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {isPhotoModalOpen && (
            <div className="photo-modal">
              <div className="photo-modal-content">
                <span className="close" onClick={() => setIsPhotoModalOpen(false)}>&times;</span>
                <img src={selectedPhoto} alt="Payment QR Code" style={imageStyles} />
              </div>
            </div>
          )}

          {isConfirmDeleteOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this user?</p>
                <div className="modal-buttons">
                  <button onClick={() => setIsConfirmDeleteOpen(false)}>Cancel</button>
                  <button onClick={handleDeleteUser}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;

