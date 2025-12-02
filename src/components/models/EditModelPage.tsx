import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBrands } from "../../hooks/useBrands";
import { Input } from "../ui/Input.tsx";
import { Button } from "../ui/Button.tsx";

const EditModelPage: React.FC = () => {
    const { brandId, modelId } = useParams();
    const cid = Number(brandId);
    const bid = Number(modelId);
    const navigate = useNavigate();

    const { brands, updateModel } = useBrands();
    const brand = brands.find(c => c.id === cid);
    const model = brand?.models.find(r => r.id === bid);

    const [title, setTitle] = React.useState(model?.title ?? "");
    const [vin, setVin] = React.useState(model?.vin ?? "");
    const [description, setDescription] = React.useState(model?.description ?? "");
    const [reserved, setReserve] = React.useState(model?.reserved ?? false);

    if (!brand || !model) return <div>Книга не найдена</div>;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        updateModel(cid, bid, { title, vin, description, reserved });
        navigate(`/brands/${cid}`);
    };

    return (
        <form className="edit-form" onSubmit={submit}>
            <h2 className="title">Редактировать модель</h2>

            <Input
                label="Название модели"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <Input
                label="VIN-номер"
                required
                value={vin}
                onChange={e => setVin(e.target.value)}
            />

            <Input
                label="Описание"
                hint="(опционально)"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <label className="edit-form__form-label">
                <input
                    type="checkbox"
                    checked={reserved}
                    onChange={e => setReserve(e.target.checked)}
                />{' '}
                Зарезервирована
            </label>

            <Button className="button button_primary" type="submit">
                Сохранить
            </Button>
        </form>
    );
};

export default EditModelPage;
