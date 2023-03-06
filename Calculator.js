//TODO :: 나중에 시간날때 계산로직 다시 볼것.
import { React, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const COLOR = {
    RESULT: '#4e4c51',
    RESET: '#5f5e62',
    OPERATOR: '#f39c29',
    NUM: '#5c5674',
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
    const backgroundColor =
        type === 'reset'
            ? COLOR.RESET
            : type === 'operator'
            ? COLOR.OPERATOR
            : type === 'num'
            ? COLOR.NUM
            : 'transparent';
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderWidth: isSelected ? 0.5 : 0.2,
                color: 'black',
            }}
        >
            <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
        </TouchableOpacity>
    );
};

const ButtonContainer = styled.View`
    flex-direction: row;
    width: 100%;
`;

const InputContainer = styled.View`
    background-color: ${COLOR.RESULT};
    min-height: 50px;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 5px;
`;

export default () => {
    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);
    const [isClickedOperator, setIsClickedOperator] = useState(false);
    const [isClickedEqual, setIsClickedEqual] = useState(false);

    const onPressNum = (num) => {
        if (currentOperator && isClickedOperator) {
            setResult(input);
            setInput(num);
        } else {
            const newInput = Number(`${input}${num}`);
            setInput(newInput);
        }
    };

    const onPressOperator = (operator) => {
        if (operator !== '=') {
            setCurrentOperator(operator);
            setIsClickedOperator(true);
            setIsClickedEqual(false);
        } else {
            let finalResult = result;
            const finalInput = isClickedEqual ? tempInput : input;
            switch (currentOperator) {
                case '+':
                    finalResult = result + input;
                    break;
                case '-':
                    finalResult = result - input;
                    break;
                case 'X':
                    finalResult = result * input;
                    break;
                case '/':
                    finalResult = result / input;
                    break;
                default:
                    break;
            }

            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setIsClickedEqual(true);
        }
    };

    const onPressReset = () => {
        setInput(0);
        setCurrentOperator(null);
        setResult(null);
        setTempInput(null);
        setTempOperator(null);
    };

    return (
        <View
            style={{
                flex: 1,
                width: 250,
                justifyContent: 'center',
            }}
        >
            <InputContainer>
                <Text
                    style={{ color: 'white', fontSize: 35, textAlign: 'right' }}
                >
                    {input}
                </Text>
            </InputContainer>

            <ButtonContainer style={{ flexDirection: 'row', width: '100%' }}>
                <Button
                    type="reset"
                    text="AC"
                    onPress={() => {
                        onPressReset();
                    }}
                    flex={3}
                />
                <Button
                    type="operator"
                    text="/"
                    onPress={() => {
                        onPressOperator('/');
                    }}
                    flex={1}
                    isSelected={currentOperator === '/'}
                />
            </ButtonContainer>
            <ButtonContainer style={{ flexDirection: 'row', width: '100%' }}>
                {[7, 8, 9].map((num) => {
                    return (
                        <Button
                            key={num}
                            type="num"
                            text={`${num}`}
                            onPress={() => {
                                onPressNum(num);
                            }}
                            flex={1}
                        />
                    );
                })}
                <Button
                    type="operator"
                    text="X"
                    onPress={() => {
                        onPressOperator('X');
                    }}
                    flex={1}
                    isSelected={currentOperator === 'X'}
                />
            </ButtonContainer>
            <ButtonContainer style={{ flexDirection: 'row', width: '100%' }}>
                {[4, 5, 6].map((num) => {
                    return (
                        <Button
                            key={num}
                            type="num"
                            text={`${num}`}
                            onPress={() => {
                                onPressNum(num);
                            }}
                            flex={1}
                        />
                    );
                })}
                <Button
                    type="operator"
                    text="-"
                    onPress={() => {
                        onPressOperator('-');
                    }}
                    flex={1}
                    isSelected={currentOperator === '-'}
                />
            </ButtonContainer>
            <ButtonContainer style={{ flexDirection: 'row', width: '100%' }}>
                {[1, 2, 3].map((num) => {
                    return (
                        <Button
                            key={num}
                            type="num"
                            text={`${num}`}
                            onPress={() => {
                                onPressNum(num);
                            }}
                            flex={1}
                        />
                    );
                })}
                <Button
                    type="operator"
                    text="+"
                    onPress={() => {
                        onPressOperator('+');
                    }}
                    flex={1}
                    isSelected={currentOperator === '+'}
                />
            </ButtonContainer>
            <ButtonContainer style={{ flexDirection: 'row', width: '100%' }}>
                <Button
                    type="num"
                    text="0"
                    onPress={() => {
                        null;
                    }}
                    flex={2}
                />
                <Button
                    type="num"
                    text="."
                    onPress={() => {
                        null;
                    }}
                    flex={1}
                />
                <Button
                    type="operator"
                    text="="
                    onPress={() => {
                        onPressOperator('=');
                    }}
                    flex={1}
                    isSelected={currentOperator === '='}
                />
            </ButtonContainer>
        </View>
    );
};
