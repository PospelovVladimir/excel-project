import CreateStore from './СreateStore';

describe('testign "CreateStore"', () => {
	const initState = { count: 0 };
	const reducer = (state, action) => {
		if (action.type === 'ADD') {
			return {
				...state,
				count: state.count + 1,
			};
		}
		return state;
	};

	let store;
	let handler;

	beforeEach(() => {
		store = new CreateStore(reducer, initState);
		handler = jest.fn();
	});

	test('check create instance from "CreateStore"', () => {
		expect(store).toBeDefined();
		expect(store.subscribe).toBeDefined();
		expect(store.dispatch).toBeDefined();
		expect(store.getState).toBeDefined();
	});

	test('should return store object', () => {
		expect(store.getState()).toBeInstanceOf(Object);
	});

	test('should default return "InitialState"', () => {
		expect(store.getState()).toEqual(initState);
	});

	test('state should change, if action exists', () => {
		store.dispatch({ type: 'ADD' });
		expect(store.getState()).toEqual({ count: 1 });
	});

	test('state should not change, if action not exists', () => {
		store.dispatch({ type: 'NOT_ACTION' });
		expect(store.getState()).toEqual(initState);
	});

	test('should subscribe on state', () => {
		store.subscribe(handler);
		store.dispatch({ type: 'ADD' });
		expect(handler).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith(store.getState());
	});

	test("don't should subscribe on state, after unsubscribe", () => {
		const unsab = store.subscribe(handler);
		unsab.unsubscribe();
		store.dispatch({ type: 'ADD' });
		expect(handler).not.toHaveBeenCalled();
	});

	test('should dispatch in async way', () =>
		new Promise(resolve => {
			setTimeout(() => {
				store.dispatch({ type: 'ADD' });
			}, 500);

			setTimeout(() => {
				expect(store.getState().count).toBe(1);
				resolve();
			}, 1000);
		}));
});
