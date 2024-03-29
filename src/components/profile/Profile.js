import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import { getAccountDetails } from "../../services/accountServices";
import  BannerSmall  from "../banner/BannerSmall";
import EditProfileModal from "./EditProfileModal";

import styles from './Profile.module.css';

export const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [profile, setProfile] = useState({
        userinfo: {}
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getAccountDetails();
                setProfile(data);
            } catch (e) {
                alert(e);
            }
        }

        fetchProfile();

    }, []);


    const changeProfileData = (data) => {
        setProfile(oldProfile => {
            return {
                ...oldProfile,
                full_name: data['full_name'],
                gender: data['gender'],
                birth_year: data['birth_year'],

            }
        })
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }




    return (
        <>
            <BannerSmall currPage="Profile" />

            {openModal &&
                <EditProfileModal {...profile}
                    changeProfileData={changeProfileData}
                    handleCloseModal={handleCloseModal} />
            }



            <section className={styles.profileSection}>

                <div className={styles.accountAddressWrapper}>
                    <div className={`${styles.accountData} ${styles.section}`}>
                        <h3 className={styles.heading}>Account data</h3>
                        <div className={styles.accountWrapper}>
                            <div>
                                <i className="fa-solid fa-circle-user"></i>
                            </div>
                            <div>
                                <p>Username: <span>{profile.username || <Skeleton />}</span></p>
                                <p>Name: <span>{profile['full_name'] || <Skeleton />}</span></p>
                                <p>Email: <span>{profile.email || <Skeleton />}</span></p>
                            </div>
                        </div>
                        <button onClick={handleOpenModal} className={styles.btn}>
                            Edit account info
                        </button>
                    </div>

                    {/* <div className={`${styles.address} ${styles.section}`}>
                        <div className={styles.addressInfo}>
                            <h3 className={styles.heading}>My addresses</h3>
                            <span>9 saved addresses</span>
                            <p className={styles.cardIcon}><i className="fa-solid fa-map-location-dot"></i></p>

                        </div>
                        <button className={styles.btn}>
                            Manage your shipping addresses
                        </button>

                    </div> */}
                </div>

                <div className={`${styles.section}`}>
                    <h3 className={styles.heading}>My activity</h3>
                    <div className={styles.activity}>
                        <div className={styles.activityWindow}>
                            <div className={styles.ordersIcon}>
                                <i className="fa-solid fa-gifts"></i>
                            </div>

                            <div>
                                <p><span>{profile.orders_count || <Skeleton />}</span> registered orders</p>
                                <Link to='orders' className={styles.btn}>See your order history</Link>
                            </div>
                        </div>

                        <div className={styles.activityWindow}>
                            <div className={styles.favoritesIcon}>
                                <i className="fa-solid fa-heart"></i>
                            </div>
                            <div>
                                <p>{profile.favorites_count} favorite products</p>
                                <Link to='favorites' className={styles.btn}>See your favorite products</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}