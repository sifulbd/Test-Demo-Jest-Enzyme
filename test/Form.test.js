import Form from '../src/components/Form';

let wrapper;

beforeEach(() => wrapper = shallow(<Form />));

describe('<Form /> rendering', () => {
  it('should render one <form>', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should not render any <button> when operator is not passed in props', () => {
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should render 2 <label>s', () => {
    expect(wrapper.find('label')).toHaveLength(2);
  });

  it('should render 2 <input>s', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should render one <button> to Add when operator \'+\' is passed in props', () => {
    wrapper.setProps({ operator: '+'});
    expect(wrapper.find('#formButtonAdd')).toHaveLength(1);
    expect(wrapper.find('#formButtonSubtract')).toHaveLength(0);
  });

  it('should render one <button> to Subtract when operator \'-\' is passed in props', () => {
    wrapper.setProps({ operator: '-' });
    expect(wrapper.find('#formButtonAdd')).toHaveLength(0);
    expect(wrapper.find('#formButtonSubtract')).toHaveLength(1);
  });
});

describe('<Form /> interactions', () => {
  it('should change the state firstNumber when onChange function of the #number1 input is invoked', () => {
    wrapper.find('#number1').simulate('change', 
      {target: { value: 50 }}
    );
    expect(wrapper.state('firstNumber')).toEqual(50);
    expect(wrapper.state('secondNumber')).toEqual('');
  });

  it('should change the state secondNumber when onChange function of the #number2 input is invoked', () => {
    wrapper.find('#number2').simulate('change',
      { target: { value: 60 }}
    );
    expect(wrapper.state('secondNumber')).toEqual(60);
    expect(wrapper.state('firstNumber')).toEqual('');
  });

  it('should call the onClick function when \'Add\' button is clicked when the operator is \'+\'', () => {
    wrapper.setProps({ operator: '+' });
    const mockedHandleClickAdd = jest.fn();
    wrapper.instance().handleAdd = mockedHandleClickAdd;
    wrapper.find('#formButtonAdd').props().onClick();
    expect(mockedHandleClickAdd).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick function when \'Subtract\' button is clicked when the operator is \'-\'', () => {
    wrapper.setProps({ operator: '-' });
    const mockedHandleClickSubtract = jest.fn();
    wrapper.instance().handleSubtract = mockedHandleClickSubtract;
    wrapper.find('#formButtonSubtract').props().onClick();
    expect(mockedHandleClickSubtract).toHaveBeenCalledTimes(1);
  });
});

describe('<Form /> lifecycle method invocations', () => {
  it('should change the state componentState componentDidMount method is invoked', () => {
    expect(wrapper.state('componentState')).toEqual('mounted');
  });
});

// Special Note on ‘componentDidMount’
// Assume you have a database call in one of your lifecycle methods (componentDidMount or any other). If you call it from the tests, it will definitely fail because you do not have the database connection when you are testing. So, the solution for this is to use a prototype function of componentDidMount which is defined in your test file like below.

// beforeAll(() => {
//     Form.prototype.componentDidMount = () => {
//         console.log('componentDidMount method is called');
//     };
// });