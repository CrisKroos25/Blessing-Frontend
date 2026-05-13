// SettingsPage.jsx
import { useCatalogSettings } from '../hooks/useCatalogSettings';
import ConfigView from '../views/ConfigView';

export default function SettingsPage() {
    const {
        categories,
        units,
        addCategory,
        removeCategory,
        addUnit,
        removeUnit,
    } = useCatalogSettings();

    return (
        <>
            <ConfigView
                categories={categories}
                units={units}
                addCategory={addCategory}
                removeCategory={removeCategory}
                addUnit={addUnit}
                removeUnit={removeUnit}
            />
        </>
    );
}
