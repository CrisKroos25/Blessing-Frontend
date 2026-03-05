import styles from './MaterialsRow.module.css';
import { Pencil, Trash2 } from 'lucide-react';

export default function MaterialsRow({ product, openModal }) {
    return (
        <tr className={styles.row} key={product.id}>
            <td>{product.image}</td>
            <td className={styles.font_bold}>{product.name}</td>
            <td>{product.category}</td>
            <td className={styles.font_bold}>{product.stock}</td>
            <td>{product.stockMin}</td>
            <td>
                <span
                    className={`${styles.badge} ${styles[product.status.replace(' ', '')]}`}
                >
                    {product.status}
                </span>
            </td>
            <td>{product.type}</td>
            <td className={styles.container__button}>
                <button
                    onClick={() => openModal('edit', product)}
                    className={styles.button__options}
                >
                    {<Pencil size={'20px'} />}
                </button>
                <button
                    onClick={() => openModal('delete', product)}
                    className={styles.button__options}
                >
                    {<Trash2 size={'20px'} />}
                </button>
            </td>
        </tr>
    );
}
