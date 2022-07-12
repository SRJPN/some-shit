var list = [25, 1, 2, 99, 4];

const getMaximalSolution = (list, i = 0, accumulator = 0, sequence = []) => {
    if(i >= list.length) {
        return [accumulator, sequence];
    }
    
    var jumpSequence = getMaximalSolution(list, i + list[i], accumulator + list[i], sequence.concat("JUMP"))
    var skipSequence = getMaximalSolution(list, i + 1, accumulator, sequence.concat("SKIP"))
    
    // console.log(jumpSequence, skipSequence, "====");
    return jumpSequence[0] > skipSequence[0] ? jumpSequence : skipSequence;
}

console.log(getMaximalSolution(list)[1]);