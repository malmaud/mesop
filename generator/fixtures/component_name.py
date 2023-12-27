from dataclasses import dataclass
from typing import Any, Callable, Literal

from mesop.utils.validate import validate

import mesop.components.component_name.component_name_pb2 as component_name_pb
from mesop.component_helpers import (
  register_event_handler,
  insert_component,
  insert_composite_component,
  register_event_mapper,
)
from mesop.events import MesopEvent, ClickEvent, InputEvent

# INSERT_EVENTS


@validate
def component_name(
  *,
  # INSERT_COMPONENT_PARAMS
):
  """INSERT_DOC_STRING
  """
  # INSERT_COMPONENT_CALL
    key=key,
    type_name="component_name",
    proto=component_name_pb.ComponentNameType(
      # INSERT_PROTO_CALLSITE
    ),
  )

# INSERT_TYPE_INDEX_FN
