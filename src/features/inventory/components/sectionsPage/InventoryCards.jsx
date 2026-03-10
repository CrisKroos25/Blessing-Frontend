import styles from './InventoryCards.module.css';
import CardInfo from '@/shared/components/cardInfo/CardInfo';
import { CARDS_ITEMS } from '@shared/constants/cardsItems';

export default function InventoryCards() {
    return (
        <div className={styles.container__cards}>
            {CARDS_ITEMS.map((item) => (
                <CardInfo
                    key={item.id}
                    logoButton={item.logoButton}
                    numberTitle={item.numberTitle}
                    titleInformation={item.titleInformation}
                    description={item.description}
                    status={item.status}
                />
            ))}
        </div>
    );
}
