import renderer from 'react-test-renderer';

import NamesInput from './Namesinput';

it('renders correctly', () => {
  const component = renderer.create(<NamesInput />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
