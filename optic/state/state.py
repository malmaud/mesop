from typing import Any, Callable, Dict, TypeVar, Generic, cast
import protos.ui_pb2 as pb

# Define a type variable for the state
S = TypeVar("S")

# (State, Payload) -> None
Handler = Callable[[S, Any], None]


class Store(Generic[S]):
    def __init__(self, initial_state: S):
        self.state = initial_state
        self.handlers: Dict[str, Handler[S]] = {}

    def dispatch(self, action: pb.UserEvent) -> None:
        payload = cast(Any, action)
        handler = self.handlers.get(action.handler_id)
        if handler:
            handler(self.state, payload)
        else:
            print(f"Unknown handler id: {action.handler_id}; handlers={self.handlers}")

    def get_state(self) -> S:
        return self.state
