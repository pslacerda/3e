
export function trigram(text: string): Set<string> {
    let trigrams = new Set<string>();
    text = "  " + text + "  ";
    for (let i = 3; i <= text.length - 3; i++) {
        let some = new Set<string>();
        some.add(text.slice(i - 2, i + 1).trim());
        some.add(text.slice(i - 1, i + 2).trim());
        some.add(text.slice(i - 0, i + 3).trim());
        trigrams = new Set<string>([...trigrams, ...some]);
    }
    return trigrams;
}


export function tanimoto<T>(a: Set<T>, b: Set<T>) {
    const intersection = new Set([...a].filter(x => b.has(x)));
    const union = new Set([...a, ...b]);
    return intersection.size / union.size;
}