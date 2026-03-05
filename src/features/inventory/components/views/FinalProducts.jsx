import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import Button from '@/shared/components/button/Button';
import { Plus } from 'lucide-react';

export default function FinalProducts() {
    return (
        <>
            <HeadTitleTable
                title={'Productos ensamblados finales'}
                subtitle={'Arreglos y combos listos para vender'}
                action={
                    <Button colorButton="#FF9800" logoButton={Plus}>
                        Agregar producto
                    </Button>
                }
            />
        </>
    );
}
