import { useEffect, useState } from 'react';
import { createDiscountCode, fetchDiscountCode } from '../../../services/adminServices';
import AddDiscountModal from './add-modal/AddDiscountModal';
import styles from './DiscountCodeList.module.css';

const DiscountCodeList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchDiscountCode();
                setDiscounts(data);
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    const closeModal = () => {
        setAddModal(false);
    }

    const submitModal = async (e) => {
        e.preventDefault();
        const {code, discount, date} = Object.fromEntries(new FormData(e.target));
        const body = {
            'code': code,
            'discount': discount,
            'expiry_date': date
        };
        try{
            const data = await createDiscountCode(body);
            setDiscounts(oldDiscounts => ([
                ...oldDiscounts,
                data
            ]));
            closeModal();
            return data;
        } catch(e){
            alert(e);
        }
    }

    return (

        <section className={styles.discountsSection}>

            <div className={styles.header}>
                <h2>Discount codes</h2>
                <button onClick={() => setAddModal(true)} className={styles.addBtn}>
                    <i className="fa-solid fa-plus"></i>
                    <span>Create new</span>
                </button>

            </div>
            {addModal && < AddDiscountModal closeModal={closeModal} onSubmit={submitModal}/>}
            <div className={styles.body}>

                <table className={styles.discountsTable}>

                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discount %</th>
                            <th>Used</th>
                            <th>Total income</th>
                            <th>Expires</th>
                        </tr>
                    </thead>

                    <tbody>

                        {discounts.map(x =>
                            <tr>
                                <td>{x.code}</td>
                                <td>{x.discount}</td>
                                <td>{x.times_used}</td>
                                <td>{x.total_income?.toFixed(2)} $</td>
                                <td>
                                    <span>{x.expiry_date}</span>
                                    <button><i class="fa-solid fa-pencil"></i></button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>

            </div>
        </section>

    );
}

export default DiscountCodeList;