import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import Button from '@/shared/components/button/Button';
import { Plus } from 'lucide-react';

export default function IndirectMaterials() {
    return (
        <>
            <HeadTitleTable
                title={'Inventario de materiales indirectos'}
                subtitle={'Consumibles y suministros'}
                action={
                    <Button colorButton="#FF9800" logoButton={Plus}>
                        Agregar material
                    </Button>
                }
            />
        </>
    );
}
