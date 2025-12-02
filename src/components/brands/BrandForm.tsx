import React from 'react';
import {Input} from "../ui/Input.tsx";
import {Button} from "../ui/Button.tsx";

type Props = { onSubmit: (title: string, description?: string) => void };

const BrandForm: React.FC<Props> = ({ onSubmit }) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit(title.trim(), description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <form className="brand-form" onSubmit={submit}>
            <Input
                label="Наименование бренда"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Введите наименование"
            />
            <Input
                label="Описание"
                hint="(опционально)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Краткое описание бренда"
            />
            <Button type="submit">Создать</Button>
        </form>
    );
};

export default BrandForm;
