import { useAuth } from '@clerk/clerk-react'
import { ReactNode, useCallback } from 'react'
import {
	PreferencesGroup,
	TldrawUiDropdownMenuContent,
	TldrawUiDropdownMenuRoot,
	TldrawUiDropdownMenuTrigger,
	TldrawUiMenuContextProvider,
	TldrawUiMenuGroup,
	TldrawUiMenuItem,
	TldrawUiMenuSubmenu,
	useValue,
} from 'tldraw'
import { Links } from '../../../components/Links'
import { globalEditor } from '../../../utils/globalEditor'

export function TlaAccountMenu({ children, source }: { children: ReactNode; source: string }) {
	const auth = useAuth()

	const handleSignout = useCallback(() => {
		auth.signOut()
	}, [auth])

	const currentEditor = useValue('editor', () => globalEditor.get(), [])

	return (
		<TldrawUiDropdownMenuRoot id={`account-menu-${source}`}>
			<TldrawUiMenuContextProvider type="menu" sourceId="dialog">
				<TldrawUiDropdownMenuTrigger>{children}</TldrawUiDropdownMenuTrigger>
				<TldrawUiDropdownMenuContent side="bottom" align="end" alignOffset={0} sideOffset={0}>
					<TldrawUiMenuGroup id="account-actions">
						<TldrawUiMenuItem label="Sign out" id="sign-out" onSelect={handleSignout} />
					</TldrawUiMenuGroup>
					<TldrawUiMenuGroup id="account-links">
						<TldrawUiMenuSubmenu id="help" label="menu.help">
							<Links />
						</TldrawUiMenuSubmenu>
					</TldrawUiMenuGroup>
					{currentEditor && <PreferencesGroup />}
				</TldrawUiDropdownMenuContent>
			</TldrawUiMenuContextProvider>
		</TldrawUiDropdownMenuRoot>
	)
}
