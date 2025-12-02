import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import {Button} from "../ui/Button.tsx";
import {Input} from "../ui/Input.tsx";

const EditBrandPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const brandId = Number(id);

    const { brands, updateBrand } = useBrands();
    const brand = brands.find(c => c.id === brandId);

    const [title, setTitle] = React.useState(brand?.title ?? "");
    const [description, setDescription] = React.useState(brand?.description ?? "");

    if (!brand) return <div>Бренд не найден</div>;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBrand(brandId, { title, description });
        navigate(`/brands/${brandId}`);
    };

    return (
        <form className="edit-form" onSubmit={submit}>
            <h2 className="title">Редактировать коллекцию брендов</h2>

            <Input
                label="Наименование бренда"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <Input
                label="Описание"
                hint="(опционально)"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <Button className="button button_primary" type="submit">
                Сохранить
            </Button>
        </form>
    );
};

export default EditBrandPage;
