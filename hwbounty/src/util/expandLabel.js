let validLabels = {
    jp: ["Japanese", { backgroundColor: "#2979ff", color: "white", fontWeight: "bold"}],
    sp: ["Spanish", { backgroundColor: "#00e676", color: "white", fontWeight: "bold"}],
    en: ["English", { backgroundColor: "#1de9b6", color: "white", fontWeight: "bold"}],
    mt: ["Math", { backgroundColor: "#ff3d00", color: "white", fontWeight: "bold"}],
    cs: ["Computer Science", { backgroundColor: "#3d5afe", color: "white", fontWeight: "bold"}],
    cn: ["Chinese", { backgroundColor: "#1b5e20", color: "white", fontWeight: "bold"}],
}

let reverseLabels = {
    Japanese: 'jp',
    Spanish: 'sp',
    English: 'en',
    Math: 'mt',
    "Computer Science": 'cs',
    Chinese: 'cn',
}

export default function expandLabel(label){
    return (validLabels[label] ? validLabels[label] : ["invalid", { backgroundColor: "#ff0000", color: "white", fontWeight: "bold"}])
}

export function compactLabel(label){
    return (reverseLabels[label] ? reverseLabels[label] : "invalid")
}