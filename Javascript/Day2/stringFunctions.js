const str = "Prakhar Goyal";

console.log("Length");
const length = str.length;
console.log(length);
console.log("===============");

console.log("charAt(index)");
for (let s in str) {
    if (str.charAt(s) === " ") {
        continue;
    }
    // console.log(str.charAt(s));
    console.log(str[s]);
}
console.log("===============");

console.log("charCodeAt(index)");
console.log(str.charCodeAt(2));

console.log("===============");
console.log("at(index)");
console.log(str.at(3));

console.log("===============");
console.log("[index]");
console.log(str[3]);

console.log("===============");
console.log("slice(start index, end index)");
console.log(str.slice(4, 12));
console.log(str.slice(-12, -4));

console.log("===============");
console.log("substring(start index, end index)");
console.log(str.substring(3, 11));
console.log(str.substring(-11, 11)); // Considers -11 as 0

console.log("===============");
console.log("substr(start index, length of substr)");
console.log(str.substr(3, 6));

console.log("===============");
console.log("toUpperCase()");
console.log(str.toUpperCase());

console.log("===============");
console.log("toLowerCase()");
const capsStr = "PRAKHAR GOYAL";
console.log(capsStr.toLowerCase());

console.log("===============");
console.log("concat(strings to concat(comma separated))");
console.log("Hello,".concat(" ", str));

console.log("===============");
console.log("trim()");
const trimStr = "    Prakhar Goyal       ";
console.log(trimStr);
console.log(trimStr.trim());

console.log("===============");
console.log("trimStart()");
const trimStr1 = trimStr.trimStart();
console.log(trimStr1.length);

console.log("===============");
console.log("trimEnd()");
const trimStr2 = trimStr.trimEnd();
console.log(trimStr2.length);

console.log("===============");
console.log(
    "padStart(length of obtained str, letter or number to pad in start)"
);
const padStr = "Welcome";
console.log(padStr.padStart(10, "a"));

console.log("===============");
console.log("padEnd(length of obtained str, letter or number to pad in end)");
console.log(padStr.padEnd(10, "a"));

console.log("===============");
console.log("repeat(count)");
console.log(padStr.repeat(2));

console.log("===============");
console.log("replace(string to replace, new string to place)");
const sentence =
    "My friend works at Microsoft. Microsoft is a very good company.";
console.log(sentence.replace("Microsoft", "Protecons")); // replaces the first occurence

console.log("===============");
console.log("replaceAll(string to replace, new string to place)");
console.log(sentence.replaceAll("Microsoft", "Protecons")); // replaces all the occurences

console.log("===============");
console.log("split(split with what symbol)");
const spaceStr = "p r a k h a r g o y a l";
const arr = spaceStr.split(" "); // creates a array
console.log(arr);
