
import * as React from 'react';
import 'jodit/build/jodit.min.css';

const JoditReact = React.lazy(() => {
	return import('jodit-react-ts');
});

type Props = {
	onChange: (content: string) => void,
	value: string,
	defaultValue?: string,

};
export const EditorWrapper: React.FC<Props> = ({ onChange, value, defaultValue }) => {
	const isSSR = typeof window === 'undefined';
	const [showChild, setShowChild] = React.useState(false);

	React.useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	if (typeof window === 'undefined') {
		return <></>;
	} else {
		return (
			<div>
				<JoditReact onChange={onChange} defaultValue={defaultValue ?? ''} />
			</div>
		);
	}
};