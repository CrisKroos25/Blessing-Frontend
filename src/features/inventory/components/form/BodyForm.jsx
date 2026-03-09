import { useState, useEffect } from 'react';

import GeneralInfoSection from '../sectionsFormBody/GeneralInfoSection';
import InventorySection from '../sectionsFormBody/InventorySection';
import PricingSection from '../sectionsFormBody/PricingSection';
import ImageSection from '../sectionsFormBody/ImageSection';

export default function BodyForm({ formData, handleChange }) {
    return (
        <>
            <GeneralInfoSection
                formData={formData}
                handleChange={handleChange}
            />

            <InventorySection formData={formData} handleChange={handleChange} />

            <PricingSection formData={formData} handleChange={handleChange} />

            <ImageSection formData={formData} handleChange={handleChange} />
        </>
    );
}
