use rdev::{listen, Event, EventType};

pub fn run_listener<F>(emit: F)
where
    F: Fn(&str, &str) + 'static,
{
    if let Err(error) = listen(move |event| callback(event, &emit)) {
        println!("Error: {:?}", error)
    }
}

fn callback<F: Fn(&str, &str)>(event: Event, emit: &F) {
    match event.name {
        Some(string) => {
            // println!("Some: {}", string);
            emit("Some", &string);
        }
        None => {
            match event.event_type {
                EventType::KeyPress(key) => {
                    // println!("KeyPress: {:?}", key);
                    let key_str = format!("{:?}", key);
                    emit("KeyPress", &key_str);
                }
                EventType::KeyRelease(key) => {
                    let key_str = format!("{:?}", key);
                    emit("KeyRelease", &key_str);
                }
                EventType::MouseMove { .. } => {
                    // Ignore MouseMove event type
                }
                _ => {
                    // println!("None: {:?}", event.event_type);
                    // let event_type_str = format!("{:?}", event.event_type);
                    // emit(&event_type_str);
                }
            }
        }
    }
}
