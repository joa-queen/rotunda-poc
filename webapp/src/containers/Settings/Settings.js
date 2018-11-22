import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Header,
  Form,
  Button,
  Divider,
  Message,
} from 'semantic-ui-react';

import { useOnMount, useInputValue } from 'hooks';
import useSettings from 'state/settings/hook';

import Loading from 'components/Loading';

import Label from './Label';
import Error from './Error';

const Settings = ({ history }) => {
  const [settings, settingsActions] = useSettings();

  const [ghToken, setGhToken] = useInputValue('');
  const [ghOrganization, setGhOrganization] = useInputValue('');
  const [ghRepo, setGhRepo] = useInputValue('');
  const [ghOverdue, setGhOverdue] = useInputValue('');
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const ghTokenInit = settings.loaded ? settings.data.GH_KEY : '';
    setGhToken(ghTokenInit);
    const ghOrganizationInit = settings.loaded ? settings.data.ORG : '';
    setGhOrganization(ghOrganizationInit);
    const ghRepoInit = settings.loaded ? settings.data.REPO : '';
    setGhRepo(ghRepoInit);
    const ghOverdueInit = settings.loaded ? settings.data.OVERDUE_SCORE : '';
    setGhOverdue(ghOverdueInit);
    const labelsInit = settings.loaded ? settings.data.LABELS : [];
    setLabels(labelsInit);
  }, [settings]);

  useOnMount(() => {
    settingsActions.load();
  });

  if (settings.loadError) return <Error mesage={`${settings.loadError}`} />;
  if (settings.loading || !settings.loaded) return <Loading />;

  const labelRemove = index => () => setLabels([
    ...labels.slice(0, index),
    ...labels.slice(index + 1),
  ]);
  const labelAdd = () => setLabels([
    ...labels,
    {
      name: '',
      weight: 10,
    },
  ]);
  const labelChange = index => key => evnt => setLabels([
    ...labels.slice(0, index),
    {
      ...labels[index],
      [key]: evnt.target.value,
    },
    ...labels.slice(index + 1),
  ]);
  const cancel = () => history.push('/');
  const save = () => {
    settingsActions.save({
      GH_KEY: ghToken.value,
      ORG: ghOrganization.value,
      REPO: ghRepo.value,
      OVERDUE_SCORE: ghOverdue.value,
      LABELS: labels,
    });
  };

  return (
    <div>
      <Header as="h1">Settings</Header>

      <Form>
        <Form.Field>
          <Input
            type="text"
            placeholder="GitHub token"
            {...ghToken}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            placeholder="Organization"
            {...ghOrganization}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            placeholder="Repository"
            {...ghRepo}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="number"
            min={1}
            placeholder="Overdue score"
            {...ghOverdue}
          />
        </Form.Field>

        <Header as="h2">Labels</Header>
        {labels.map(({ name, weight }, index) => (
          <Label
            // eslint-disable-next-line
            key={`label_${index}`}
            name={name}
            weight={weight}
            onRemove={labelRemove(index)}
            onChange={labelChange(index)}
          />
        ))}
        <Button basic onClick={labelAdd} style={{ marginTop: '10px' }}>Add new</Button>
      </Form>

      {settings.saveError && (
        <Message
          error
          header="Something is not right"
          content={`${settings.saveError}`}
        />
      )}

      <Divider />

      <Button basic onClick={cancel}>Cancel</Button>
      <Button
        loading={settings.saving}
        disabled={settings.saving}
        onClick={save}
      >
        Save
      </Button>
    </div>
  );
};

Settings.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(Settings);
