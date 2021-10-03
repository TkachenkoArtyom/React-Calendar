import { Button, Layout, Modal, Row } from 'antd';
import { FC, ReactElement, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

interface Props {
	
}

const Event: FC = ({ }: Props): ReactElement => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { fetchGuests, createEvent, fetchEvents } = useActions()
	const { guests, events } = useTypedSelector(state => state.EventReducer)
	const { user } = useTypedSelector(state => state.AuthReducer)

	useEffect(() => {
		fetchGuests()
		fetchEvents(user.username)
	}, [])

	const addNewEvent = (event: IEvent) => { 
		setIsModalVisible(false)
		createEvent(event)
	}

	return (
		<Layout>
			{/* {JSON.stringify(events)} */}
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setIsModalVisible(true)}>Добавить событие</Button>
      </Row>
      <Modal
        title="Добавить событие"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
}

export default Event;