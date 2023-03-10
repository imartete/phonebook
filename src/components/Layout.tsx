import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { Burger, Button, MediaQuery, Text, Tabs, Flex } from '@mantine/core';
import { AppShell, Navbar, Header } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';
import { logOut } from '../redux/user/operations';
import {
  IconAddressBook,
  IconHome2,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons';
import { useAppDispatch } from '../hooks/typedHooks';

export function Layout() {
  const [opened, setOpened] = useState<boolean>(false);
  const { isLoggedIn, user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Tabs
          defaultValue="/"
          value={pathname}
          onTabChange={value => navigate(`${value}`)}
          color="indigo"
          orientation="vertical"
          placement="right"
        >
          <Tabs.List>
            <Navbar
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Tabs.Tab
                value="/"
                onClick={() => {
                  setOpened(o => !o);
                }}
                icon={<IconHome2 size={20} stroke={1.5} />}
              >
                <Text fz="xl" fw={700}>
                  Home
                </Text>
              </Tabs.Tab>

              {isLoggedIn && (
                <Tabs.Tab
                  value="/contacts"
                  onClick={() => {
                    setOpened(o => !o);
                  }}
                  icon={<IconAddressBook size={20} stroke={1.5} />}
                >
                  <Text fz="xl" fw={700}>
                    Contacts
                  </Text>
                </Tabs.Tab>
              )}
              {!isLoggedIn ? (
                <>
                  <Tabs.Tab
                    value="/register"
                    onClick={() => {
                      setOpened(o => !o);
                    }}
                    icon={<IconUserPlus size={20} stroke={1.5} />}
                  >
                    <Text fz="xl" fw={700}>
                      Register
                    </Text>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="/login"
                    onClick={() => {
                      setOpened(o => !o);
                    }}
                    icon={<IconLogin size={20} stroke={1.5} />}
                  >
                    <Text fz="xl" fw={700}>
                      Sign In
                    </Text>
                  </Tabs.Tab>
                </>
              ) : (
                <Flex
                  sx={{ marginTop: 'auto', marginBottom: 50 }}
                  direction="column"
                  gap="md"
                >
                  <Text fz="lg" fw={500} color="indigo">
                    Hi, {user.name}! :D
                  </Text>
                  <Button
                    variant="light"
                    color="indigo"
                    size="lg"
                    onClick={() => dispatch(logOut())}
                  >
                    Sign out
                  </Button>
                </Flex>
              )}
            </Navbar>
          </Tabs.List>
        </Tabs>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => {
                  setOpened(o => !o);
                }}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Text variant="gradient" fz="xl" fw={500}>
              PhoneBO.Ok
            </Text>
          </div>
        </Header>
      }
    >
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
}
