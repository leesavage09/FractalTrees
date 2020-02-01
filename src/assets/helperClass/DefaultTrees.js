class DefaultTrees {

    static christmasTree = {
        initLength: 250, initWidth: 50,
        nextLengthMin: 0.5, nextLengthMax: 0.5,
        nextWidthMin: 0.5, nextWidthMax: 0.5,
        nextBendMin: 0, nextBendMax: 0,
        nextAngleMin: 0, nextAngleMax: 0,
        nextSideAngleMin: 128, nextSideAngleMax: 128,
        deathMin: 100, deathMax: 100,
        deathSideMin: 100, deathSideMax: 100,
        fruit: 20, leaf: 100,
    };

    static niceTree = {
        initLength: 91, initWidth: 22,
        nextLengthMin: 0.6, nextLengthMax: 0.85,
        nextWidthMin: 0.56, nextWidthMax: 0.8,
        nextBendMin: 5, nextBendMax: 8,
        nextAngleMin: -20, nextAngleMax: 20,
        nextSideAngleMin: 20, nextSideAngleMax: 40,
        deathMin: 95, deathMax: 95,
        deathSideMin: 60, deathSideMax: 60,
        fruit: 0, leaf: 0,
    };

    static basicTree = {
        initLength: 200, initWidth: 15,
        nextLengthMin: 0.6, nextLengthMax: 0.6,
        nextWidthMin: 0.8, nextWidthMax: 0.8,
        nextBendMin: 0, nextBendMax: 0,
        nextAngleMin: 0, nextAngleMax: 0,
        nextSideAngleMin: 45, nextSideAngleMax: 45,
        deathMin: 0, deathMax: 0,
        deathSideMin: 100, deathSideMax: 100,
        fruit: 0, leaf: 0,
    };

    static squareTree = {
        initLength: 250, initWidth: 36,
        nextLengthMin: 0.7, nextLengthMax: 0.7,
        nextWidthMin: 0.8, nextWidthMax: 0.8,
        nextBendMin: 0, nextBendMax: 0,
        nextAngleMin: 0, nextAngleMax: 0,
        nextSideAngleMin: 90, nextSideAngleMax: 90,
        deathMin: 0, deathMax: 0,
        deathSideMin: 100, deathSideMax: 100,
        fruit: 0, leaf: 0,
    };

    static crazyTree = {
        initLength: 200, initWidth: 15,
        nextLengthMin: 0.6, nextLengthMax: 0.6,
        nextWidthMin: 0.8, nextWidthMax: 0.8,
        nextBendMin: 0.1, nextBendMax: 1,
        nextAngleMin: 0, nextAngleMax: 0,
        nextSideAngleMin: 45, nextSideAngleMax: 45,
        deathMin: 0, deathMax: 0,
        deathSideMin: 100, deathSideMax: 100,
        fruit: 0, leaf: 0,
    };

    static ballTree = {
        initLength: 200, initWidth: 100,
        nextLengthMin: 0.6, nextLengthMax: 0.6,
        nextWidthMin: 0.8, nextWidthMax: 0.8,
        nextBendMin: 0.1, nextBendMax: 0.1,
        nextAngleMin: 0, nextAngleMax: 0,
        nextSideAngleMin: 45, nextSideAngleMax: 45,
        deathMin: 0, deathMax: 0,
        deathSideMin: 100, deathSideMax: 100,
        fruit: 0, leaf: 0,
    };

    static oakTree = {
        initLength: 127, initWidth: 71,
        nextLengthMin: 0.6, nextLengthMax: 0.8,
        nextWidthMin: 0.6, nextWidthMax: 0.75,
        nextBendMin: 11, nextBendMax: 15,
        nextAngleMin: -20, nextAngleMax: 20,
        nextSideAngleMin: 27, nextSideAngleMax: 35,
        deathMin: 85, deathMax: 95,
        deathSideMin: 69, deathSideMax: 79,
        fruit: 0, leaf: 8.4,
    };

    static shrubTree = {
        initLength: 120, initWidth: 33,
        nextLengthMin: 0.6, nextLengthMax: 0.85,
        nextWidthMin: 0.28, nextWidthMax: 0.67,
        nextBendMin: 6, nextBendMax: 7,
        nextAngleMin: -7, nextAngleMax: 7,
        nextSideAngleMin: 8, nextSideAngleMax: 18,
        deathMin: 95, deathMax: 95,
        deathSideMin: 60, deathSideMax: 60,
        fruit: 4, leaf: 0,
    };
    
}

export default DefaultTrees;