import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  Key,
  Type,
  UserEvent,
} from 'optic/optic/protos/ui_jspb_proto_pb/optic/protos/ui_pb';
import {TextInputType} from 'optic/optic/components/text_input/text_input_jspb_proto_pb/optic/components/text_input/text_input_pb';
import {Channel} from '../../../web/src/services/channel';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ObserversModule} from '@angular/cdk/observers';

@Component({
  selector: 'optic-text-input',
  templateUrl: 'text_input.ng.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ObserversModule],
})
export class TextInputComponent {
  @Input({required: true}) type!: Type;
  @Input() key!: Key;
  private _config!: TextInputType;
  isChecked = false;

  constructor(private readonly channel: Channel) {}

  ngOnChanges() {
    this._config = TextInputType.deserializeBinary(
      this.type.getValue() as Uint8Array,
    );
  }

  config(): TextInputType {
    return this._config;
  }

  onChange(event: Event) {
    const userEvent = new UserEvent();
    userEvent.setString((event.target as HTMLInputElement).value);
    userEvent.setHandlerId(this.config().getOnChangeHandlerId()!);
    this.channel.dispatch(userEvent);
  }
}
