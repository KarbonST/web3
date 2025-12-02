import React from 'react';
import { Input } from "../ui/Input.tsx";
import { Button } from "../ui/Button.tsx";

type Props = { onSubmit: (title: string, vin: string, description?: string) => void };

const ModelForm: React.FC<Props> = ({ onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [vin, setVin] = React.useState('');
    const [description, setDescription] = React.useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !vin.trim()) return;
        onSubmit(title.trim(), vin.trim(), description.trim());
        setTitle('');
        setVin('');
        setDescription('');
    };

    return (
        <form className="model-form" onSubmit={submit}>
            <Input
                label="Наименование модели"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Введите наименование"
            />
            <Input
                label="VIN-номер"
                required
                value={vin}
                onChange={e => setVin(e.target.value)}
                placeholder="Введите VIN"
            />
            <Input
                label="Описание"
                hint="(опционально)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Краткое описание"
            />
            <Button type="submit">Добавить</Button>
        </form>
    );
};

export default ModelForm;
