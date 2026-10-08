import { useState, useEffect } from "react";
import "./style.css";
function TodoItem({ tache, onToggle, onDelete }) {
    // TODO : afficher le texte de la tache (barre si terminee)
    // + un bouton pour supprimer
    return (
        <li>
            <span style={{ textDecoration: tache.terminee ? "line-through" : "none" }}>
                {tache.texte}
            </span>
            <div className="actions">
                <button className="toggle" onClick={() => onToggle(tache.id)}>Toggle</button>
                <button className="delete" onClick={() => onDelete(tache.id)}>Supprimer</button>
            </div>
        </li>
    );
}

export default function App() {
    const [taches, setTaches] = useState(() => {
        const tachesStockees = localStorage.getItem("taches");
        return tachesStockees ? JSON.parse(tachesStockees) : [];
    })
    const [texte, setTexte] = useState("");

    // TODO : fonction ajouterTache
    const ajouterTache = () => {
        if (texte.trim() !== "") {
            const nouvelleTache = {
                id: Date.now(),
                texte: texte.trim(),
                terminee: false
            };
            setTaches([...taches, nouvelleTache]);
            setTexte("");
        }
    };

    // TODO : fonction toggleTache
    const toggleTache = (id) => {
        setTaches(
            taches.map((tache) =>
                tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
            )
        );
    };

    // TODO : fonction supprimerTache
    const supprimerTache = (id) => {
        setTaches(taches.filter((tache) => tache.id !== id));
    };

    useEffect(() => {
        localStorage.setItem("taches", JSON.stringify(taches))
    }, [taches])
    return (
        <>

            <div className="app">
                <h1>Ma Todo List</h1>

                <input
                    value={texte}
                    onChange={(e) => setTexte(e.target.value)}
                    placeholder="Nouvelle tache..."
                />
                <button className="ajout" onClick={ajouterTache} >Ajouter</button>

                <ul>{/* TODO : afficher les TodoItem avec map */
                    taches.map((tache) => (
                        <TodoItem
                            key={tache.id}
                            tache={tache}
                            onToggle={toggleTache}
                            onDelete={supprimerTache}
                        />
                    ))}</ul>

                <p>{/* TODO : nombre de taches restantes */}
                    {taches.filter((tache) => !tache.terminee).length} taches restantes</p>
            </div>
        </>
    );
}
