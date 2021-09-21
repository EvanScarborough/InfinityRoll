import { useState, useEffect } from 'react';


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function useGenerator(name, user) {
    const [gen, setGen] = useState(null);
    const [references, setReferences] = useState({});
    const [results, setResults] = useState([]);

    const pickItem = (list, refs, before, after) => {
        var item = before + list[getRandomInt(list.length)] + after;
        
        const refmatch = item.match(/@([a-zA-Z_][a-z0-9_]*)/);
        if (refmatch) {
            // there's a reference to another generator
            const b = item.substring(0, refmatch.index);
            const a = item.substring(refmatch.index + refmatch[0].length);
            const refID = refmatch[1].toLowerCase();
            if (refs[refID] && refs[refID].length > 0) {
                // that reference has already been loaded
                pickItem(refs[refID], refs, b, a);
            }
            else {
                // need to load a new generator
                fetch(`/api/gen/${refID}`,{ method: 'GET', headers: { Accept: 'application/json' }})
                    .then(res => res.json())
                    .then(res => {
                        if (res && res.items && res.items.length > 0) {
                            // got a valid generator
                            refs[refID] = res.items.map(i => i.text);
                            pickItem(refs[refID], refs, b, a);
                        }
                    }).catch(err => setResults(["Error", ...results]));
            }
        }
        else {
            setReferences(refs);
            setResults([item, ...results]);
        }
    }

    const generate = () => {
        if (!gen || gen.items.length === 0) { setResults(["👎 No items to choose from. Add items below!", ...results]); return; }
        pickItem(gen.items.map(i => i.text), references, "", "");
    }

    useEffect(() => {
        if (!gen) {
            fetch(`/api/gen/${name}`, { method: 'GET', headers: { Accept: 'application/json' } })
            .then(res => res.json()).then(res => {
                setGen({ info:res.list, items:res.items });
            });
        }
    });

    const addItem = item => {
        console.log(item);
        fetch(`/api/gen/${name}/item`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', token: user.token },
                body:JSON.stringify({item})
            })
            .then(res => res.json()).then(res => {
                res.item.createdBy = user;
                setGen({ info: gen.info, items: [...gen.items, res.item]});
            });
    };

    const toggleLike = () => {
        if (!user) return;
        fetch(`/api/gen/${name}/like`, {
			method: 'POST',
			headers: { Accept: "application/json", token: user.token }
		}).then(res => res.json()).then(
			(result) => {
				if (result.hasOwnProperty("upvotes")) {
                    setGen({...gen, info: {...gen.info, upvotes: result.upvotes}});
				}
			},
			(error) => {
				console.log(error);
			}
		);
    }

    return [gen, results, generate, addItem, toggleLike];
}



export default useGenerator;
export { getRandomInt };